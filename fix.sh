#!/bin/bash

declare -A files=(
  ["src/components/permThreeComponents/GolfBall.tsx"]="src/components/permThreeComponents/golfBall.tsx"
  ["src/components/permComponents/cvModal/ProfessionalExperienceModal.tsx"]="src/components/permComponents/cvModal/professionalExperienceModal.tsx"
  ["src/components/permComponents/speedDial/MotionButton.tsx"]="src/components/permComponents/speedDial/motionButton.tsx"
  ["src/components/permComponents/speedDial/SpeedDialInfo.tsx"]="src/components/permComponents/speedDial/speedDialInfo.tsx"
)

for src in "${!files[@]}"; do
  temp="${files[$src]}Temp"
  dest="${files[$src]}"
  git mv "$src" "$temp"
  git mv "$temp" "$dest"
done

git add .
git commit -m "Fix case sensitivity issues for file names"
git push origin main

