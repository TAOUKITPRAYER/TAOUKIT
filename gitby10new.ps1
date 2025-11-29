# -----------------------------
# git10new.ps1
# -----------------------------
# Commit and force push only new files in batches of 10
# -----------------------------

# CONFIG
$branch = "main"
$batchSize = 10
$repoUrl = "https://github.com/KsibetTawkit/TAOUKIT.git"

Write-Host "`n===== GIT BATCH FORCE PUSH NEW FILES =====`n" -ForegroundColor Cyan

# Ensure Git repo initialized
if (-Not (Test-Path ".git")) {
    git init
    git remote add origin $repoUrl
    git checkout -b $branch
} else {
    git checkout $branch
}

# Fetch latest remote branch to be sure
git fetch origin $branch

# Get list of untracked (new) files
$newFiles = git ls-files --others --exclude-standard
$totalNew = $newFiles.Count
Write-Host ("Total new files to process: " + $totalNew) -ForegroundColor Cyan

if ($totalNew -eq 0) {
    Write-Host "No new files detected. Nothing to commit." -ForegroundColor Green
    exit 0
}

# Process in batches of $batchSize
$batchIndex = 0
for ($i = 0; $i -lt $totalNew; $i += $batchSize) {
    $batchIndex++
    $end = [Math]::Min($i + $batchSize - 1, $totalNew - 1)
    $batch = $newFiles[$i..$end]

    $startIndex = $i + 1
    $endIndex = $end + 1

    Write-Host ("--- Batch " + $batchIndex + " (new files " + $startIndex + " to " + $endIndex + ") ---") -ForegroundColor Magenta

    foreach ($f in $batch) {
        try {
            Write-Host ("  A : " + $f)
            git add "$f" 2>$null
        } catch {
            Write-Host ("  SKIPPED (locked or error) : " + $f) -ForegroundColor Yellow
        }
    }

    # Commit batch
    $commitMsg = "New files batch " + $batchIndex + ": " + $startIndex + " to " + $endIndex
    git commit -m "$commitMsg" 2>$null
    Write-Host ("Commit batch " + $batchIndex + " done.") -ForegroundColor Green

    # Force push batch
    git push origin $branch --force
    if ($LASTEXITCODE -ne 0) {
        Write-Host ("Error pushing batch " + $batchIndex + ". Stopping.") -ForegroundColor Red
        exit 1
    } else {
        Write-Host ("Push batch " + $batchIndex + " OK.") -ForegroundColor Green
    }
}

Write-Host ("All new files have been pushed in batches of " + $batchSize + ".") -ForegroundColor Cyan
