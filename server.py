from http.server import SimpleHTTPRequestHandler, HTTPServer
import requests
from urllib.parse import urlparse, parse_qs

class CORSRequestHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed_path = urlparse(self.path)

        if parsed_path.path == "/proxy":  # Handle /proxy?url=<target>
            query_params = parse_qs(parsed_path.query)
            target_url = query_params.get('url', [None])[0]  # Extract the target URL

            if not target_url:
                self.send_response(400)  # Bad request
                self.send_header("Content-Type", "text/plain")
                self.end_headers()
                self.wfile.write(b"Missing 'url' parameter")
                return

            try:
                response = requests.get(target_url, timeout=5)
                self.send_response(response.status_code)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")  # Allow CORS
                self.end_headers()
                self.wfile.write(response.content)  # Forward Shelly response
            except requests.RequestException as e:
                self.send_response(500)
                self.send_header("Content-Type", "text/plain")
                self.end_headers()
                self.wfile.write(str(e).encode())

        else:
            super().do_GET()  # Default behavior for static files

server_address = ('', 9090)  # Ensure the port matches your JavaScript
httpd = HTTPServer(server_address, CORSRequestHandler)
print("Serving on port 9090...")
httpd.serve_forever()
