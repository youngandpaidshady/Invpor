# Clear Next.js Cache and Restart Dev Server
# Run this script when you encounter cache issues

# Kill all node processes
taskkill /F /IM node.exe 2>$null

# Wait for processes to fully terminate
Start-Sleep -Seconds 2

# Remove Next.js cache
Remove-Item .next -Recurse -Force -ErrorAction SilentlyContinue

# Remove node_modules cache
Remove-Item node_modules/.cache -Recurse -Force -ErrorAction SilentlyContinue

# Start dev server
npm run dev
