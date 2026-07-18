#!/usr/bin/env python3
"""
genqr.py - QR Code generator with custom color and center label
Usage: python genqr.py <size> <color> <label> <url> [output]

  size   : WxH in pixels, e.g. 200x200
  color  : RED | GREEN | BLUE | BLACK
  label  : text displayed in a white box at the center, e.g. A-14
  url    : URL (or any text) encoded in the QR code
  output : (optional) output PNG path (default: qr_<label>.png)

Examples:
  python genqr.py 300x300 RED A-14 https://maps.app.goo.gl/XXXXX
  python genqr.py 200x200 BLUE "Salle 3" https://tawkit.net salle3.png
"""

import sys
import os

# ---------------------------------------------------------------------------
# Dependency check
# ---------------------------------------------------------------------------
try:
    import qrcode
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    print("Missing dependencies. Install with:")
    print("  pip install qrcode[pil] pillow")
    sys.exit(1)

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------
COLORS = {
    "RED":   (200, 30,  30),
    "GREEN": (30,  160, 30),
    "BLUE":  (30,  60,  200),
    "BLACK": (0,   0,   0),
}

LABEL_PADDING   = 8    # px around the text inside the white box
BOX_BORDER      = 2    # white border around the box so QR modules aren't clipped
FONT_RATIO      = 0.12 # font size as a fraction of the final image width

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def parse_size(s):
    parts = s.lower().split("x")
    if len(parts) != 2:
        raise ValueError(f"Invalid size '{s}'. Use WxH, e.g. 200x200")
    return int(parts[0]), int(parts[1])


def pick_font(size_px):
    """Return the best available PIL font at the given pixel size."""
    candidates = [
        # Common system paths
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
        "C:/Windows/Fonts/arialbd.ttf",
        "C:/Windows/Fonts/arial.ttf",
        "C:/Windows/Fonts/calibrib.ttf",
        os.path.expanduser("~/Library/Fonts/Arial Bold.ttf"),
        "/System/Library/Fonts/Helvetica.ttc",
    ]
    for path in candidates:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size_px)
            except Exception:
                pass
    # Fallback: PIL built-in bitmap font (no size control)
    return ImageFont.load_default()


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def generate_qr(url_or_text, size_str, color_name, label, output_path):
    width, height = parse_size(size_str)
    color = COLORS.get(color_name.upper())
    if color is None:
        raise ValueError(f"Unknown color '{color_name}'. Choose from: {', '.join(COLORS)}")

    # 1. Build raw QR (black on white, extra quiet zone for later resize)
    qr = qrcode.QRCode(
        error_correction=qrcode.constants.ERROR_CORRECT_H,  # high => ~30% data recovery
        box_size=10,
        border=2,
    )
    qr.add_data(url_or_text)
    qr.make(fit=True)

    qr_img = qr.make_image(fill_color="black", back_color="white").convert("RGB")

    # 2. Recolor: replace black pixels with chosen color
    data = qr_img.load()
    for y in range(qr_img.height):
        for x in range(qr_img.width):
            if data[x, y][0] < 128:   # dark pixel → apply color
                data[x, y] = color

    # 3. Resize to requested dimensions
    qr_img = qr_img.resize((width, height), Image.LANCZOS)

    # 4. Draw center label
    draw = ImageDraw.Draw(qr_img)
    font_size = max(12, int(width * FONT_RATIO))
    font = pick_font(font_size)

    # Measure text
    bbox = draw.textbbox((0, 0), label, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]

    # Box dimensions
    box_w = tw + LABEL_PADDING * 2 + BOX_BORDER * 2
    box_h = th + LABEL_PADDING * 2 + BOX_BORDER * 2
    box_x0 = (width  - box_w) // 2
    box_y0 = (height - box_h) // 2
    box_x1 = box_x0 + box_w
    box_y1 = box_y0 + box_h

    # White filled box (no border outline — white on white background is clean)
    draw.rectangle([box_x0, box_y0, box_x1, box_y1], fill=(255, 255, 255))

    # Text centered in the box
    tx = box_x0 + BOX_BORDER + LABEL_PADDING - bbox[0]
    ty = box_y0 + BOX_BORDER + LABEL_PADDING - bbox[1]
    draw.text((tx, ty), label, fill=color, font=font)

    # 5. Save
    qr_img.save(output_path, "PNG")
    print(f"QR saved: {output_path}  ({width}x{height}, {color_name}, label='{label}')")


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print(__doc__)
        sys.exit(1)

    size_arg   = sys.argv[1]          # e.g. 200x200
    color_arg  = sys.argv[2]          # e.g. RED
    label_arg  = sys.argv[3]          # e.g. A-14

    # The QR data defaults to the label itself if no 5th arg is provided.
    # Swap argument order if you want a separate URL: add it as argv[4].
    qr_data    = sys.argv[4] if len(sys.argv) >= 5 else label_arg
    out_file   = sys.argv[5] if len(sys.argv) >= 6 else f"qr_{label_arg.replace(' ', '_')}.png"

    try:
        generate_qr(qr_data, size_arg, color_arg, label_arg, out_file)
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)
