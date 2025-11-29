# -------- CONFIG --------
$batchSize = 20     # Number of files per commit
$branch = "main"    # Change this if needed
# ------------------------

Write-Host "`n===== GIT STATUS OVERVIEW =====" -ForegroundColor Cyan

# Get pending items
$pending = git status --porcelain

if ($pending.Count -eq 0) {
    Write-Host "No pending commits or changes." -ForegroundColor Green
    exit
}

# Show pending with Git action
Write-Host "Pending files with actions:" -ForegroundColor Yellow
foreach ($line in $pending) {
    $action = $line.Substring(0, 2).Trim()
    $file   = $line.Substring(3)

    Write-Host ("  → [{0}] {1}" -f $action, $file)
}

# Pending pushes
$pendingPush = git log origin/$branch..HEAD --oneline
if ($pendingPush) {
    Write-Host "`nPending commits to push:" -ForegroundColor Yellow
    $pendingPush | ForEach-Object { Write-Host "  → $_" }
} else {
    Write-Host "`nNo pending pushes." -ForegroundColor Green
}

# Extract list of files (clean path)
$files = $pending | ForEach-Object { $_.Substring(3) }

Write-Host "`n===== STARTING BATCH PROCESS =====" -ForegroundColor Cyan
Write-Host "Total files: $($files.Count). Processing in batches of $batchSize ..." -ForegroundColor Cyan


# Process batches
for ($i = 0; $i -lt $files.Count; $i += $batchSize) {

    $batch = $files[$i..([Math]::Min($i + $batchSize - 1, $files.Count - 1))]

    Write-Host "`n--- Batch $([Math]::Floor($i/$batchSize) + 1) ---" -ForegroundColor Magenta
    Write-Host "Actions in this batch:" -ForegroundColor DarkYellow

    # Show action per file
    foreach ($file in $batch) {
        $statusLine = $pending | Where-Object { $_.Substring(3) -eq $file }
        $action = $statusLine.Substring(0, 2).Trim()

        Write-Host ("  + [{0}] {1}" -f $action, $file)
    }

    # Add files
    foreach ($f in $batch) { git add "$f" }

    # Commit
    $commitMsg = "Batch commit: files $($i + 1) to $([Math]::Min($i + $batchSize, $files.Count))"
    git commit -m "$commitMsg"
    Write-Host "Committed: $commitMsg" -ForegroundColor Green

    # Push
    git push origin $branch
    Write-Host "Pushed batch successfully." -ForegroundColor Green
}

Write-Host "`n===== ALL DONE! =====" -ForegroundColor Cyan
