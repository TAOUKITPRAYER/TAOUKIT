# -----------------------------
# gitby10_concat.ps1
# -----------------------------
# Usage: run from repository root in PowerShell
# -----------------------------

# ----- CONFIG -----
$branch = "main"       # Target branch
$batchSize = 10        # Number of files per commit
$repoUrl = "https://github.com/KsibetTawkit/TAOUKIT.git"  # GitHub URL
# -------------------

Write-Host "`n===== GIT CLEAN BATCH PUSH =====`n" -ForegroundColor Cyan

# ---- Check if folder is a Git repo ----
if (Test-Path .git) {
    Write-Host "Resetting local Git repository..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force .git
}

# ---- Initialize Git and add remote ----
git init
git remote add origin $repoUrl
git checkout -b $branch

# ---- Uninstall LFS to remove old large file history ----
Write-Host "Cleaning LFS files..." -ForegroundColor Yellow
git lfs uninstall 2>$null

# ---- List all current files ----
$allFiles = Get-ChildItem -Recurse -File | Select-Object -ExpandProperty FullName
$totalFiles = $allFiles.Count
Write-Host ("Total files to process: " + $totalFiles) -ForegroundColor Cyan

# ---- Split files into batches and commit/push ----
$batchIndex = 0
for ($i = 0; $i -lt $totalFiles; $i += $batchSize) {
    $batchIndex++
    $end = [Math]::Min($i + $batchSize - 1, $totalFiles - 1)
    $batch = $allFiles[$i..$end]

    $startIndex = $i + 1
    $endIndex = $end + 1

    Write-Host ("--- Batch " + $batchIndex + " (files " + $startIndex + " to " + $endIndex + ") ---") -ForegroundColor Magenta

    foreach ($f in $batch) {
        # Detect file action (Added, Modified, Deleted)
        $status = git status --porcelain "$f"
        if ($status -match '^A') { $action = "A" }
        elseif ($status -match '^M') { $action = "M" }
        elseif ($status -match '^D') { $action = "D" }
        else { $action = "?" }

        Write-Host ("  " + $action + " : " + $f)
        git add "$f"
    }

    # Commit batch
    $commitMsg = "Batch " + $batchIndex + ": files " + $startIndex + " to " + $endIndex
    git commit -m "$commitMsg"
    Write-Host ("Commit batch " + $batchIndex + " done.") -ForegroundColor Green

    # Push batch
    git push origin $branch
    if ($LASTEXITCODE -ne 0) {
        Write-Host ("Error pushing batch " + $batchIndex + ". Stopping.") -ForegroundColor Red
        exit 1
    } else {
        Write-Host ("Push batch " + $batchIndex + " OK.") -ForegroundColor Green
    }
}

Write-Host ("All files have been pushed in batches of " + $batchSize + ".") -ForegroundColor Cyan
