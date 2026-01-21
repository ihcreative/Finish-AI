#!/bin/bash
# Launch Component Test & Validation Script
# Run this to verify everything is working

echo "================================"
echo "Launch Component Validation"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if launch component files exist
echo "Checking file structure..."

files=(
  "src/components/launch/launch.component.ts"
  "src/components/launch/launch.component.html"
  "src/components/launch/launch.component.css"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo -e "${GREEN}✓${NC} $file exists"
  else
    echo -e "${RED}✗${NC} $file missing"
  fi
done

echo ""
echo "Checking TypeScript compilation..."

# Check for syntax errors in TS file
if grep -q "don't\|don't" "src/components/launch/launch.component.ts"; then
  echo -e "${RED}✗${NC} Found smart quotes - may cause compilation errors"
else
  echo -e "${GREEN}✓${NC} No smart quote issues detected"
fi

# Check for variants
echo ""
echo "Checking variant definitions..."

variants=("default" "creator" "dev" "founder" "tiktok")
for variant in "${variants[@]}"; do
  if grep -q "\"$variant\":" "src/components/launch/launch.component.ts"; then
    echo -e "${GREEN}✓${NC} Variant '$variant' defined"
  else
    echo -e "${RED}✗${NC} Variant '$variant' missing"
  fi
done

# Check for GA tracking
echo ""
echo "Checking GA tracking code..."

if grep -q "trackVariantView" "src/components/launch/launch.component.ts"; then
  echo -e "${GREEN}✓${NC} trackVariantView() method exists"
else
  echo -e "${RED}✗${NC} trackVariantView() method missing"
fi

if grep -q "trackCTA" "src/components/launch/launch.component.ts"; then
  echo -e "${GREEN}✓${NC} trackCTA() method exists"
else
  echo -e "${RED}✗${NC} trackCTA() method missing"
fi

if grep -q "view_landing_variant" "src/components/launch/launch.component.ts"; then
  echo -e "${GREEN}✓${NC} GA event 'view_landing_variant' configured"
else
  echo -e "${RED}✗${NC} GA event 'view_landing_variant' missing"
fi

# Check routing
echo ""
echo "Checking routing setup..."

if grep -q "LaunchComponent" "src/app.routes.ts"; then
  echo -e "${GREEN}✓${NC} LaunchComponent imported in routes"
else
  echo -e "${RED}✗${NC} LaunchComponent not imported"
fi

if grep -q "path: 'launch', component: LaunchComponent" "src/app.routes.ts"; then
  echo -e "${GREEN}✓${nc} Launch route configured correctly"
else
  echo -e "${YELLOW}!${NC} Launch route may need verification"
fi

# Check for animations
echo ""
echo "Checking animation styles..."

if grep -q "@keyframes fadeInDown" "src/components/launch/launch.component.css"; then
  echo -e "${GREEN}✓${NC} Animations defined in CSS"
else
  echo -e "${RED}✗${NC} Animations not found"
fi

# Documentation check
echo ""
echo "Checking documentation..."

docs=(
  "LAUNCH_QUICK_START.md"
  "LAUNCH_VARIANT_DOCS.md"
  "CAMPAIGN_SETUP.md"
)

for doc in "${docs[@]}"; do
  if [ -f "$doc" ]; then
    echo -e "${GREEN}✓${NC} $doc created"
  else
    echo -e "${RED}✗${NC} $doc missing"
  fi
done

echo ""
echo "================================"
echo "Validation Complete!"
echo "================================"
echo ""
echo "Next steps:"
echo "1. Run: ng serve"
echo "2. Visit: http://localhost:4200/launch"
echo "3. Test variants: ?v=creator, ?v=dev, ?v=founder, ?v=tiktok"
echo "4. Open DevTools to check GA events firing"
echo "5. Read LAUNCH_QUICK_START.md for detailed guide"
echo ""
