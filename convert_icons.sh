#!/bin/bash

# This script converts all icon components from JavaScript to TypeScript

# The directory where the .js icon files are located
ICON_DIR="src/Icons"

# Check if the directory exists
if [ ! -d "$ICON_DIR" ]; then
  echo "Error: Directory '$ICON_DIR' not found."
  exit 1
fi

# Loop through all .js files in the specified directory
for js_file in "$ICON_DIR"/*.js; do
  # Continue if it's not a file
  [ -f "$js_file" ] || continue

  # Determine the new .tsx filename
  tsx_file="${js_file%.js}.tsx"

  # Get the component name from the filename
  component_name=$(basename "$js_file" .js)

  echo "Converting $js_file to $tsx_file..."

  # Use sed to perform the code transformations
  # 1. Replace `iconType` import with `IconType`.
  # 2. Add the React.FC<IconType> type to the component definition.
  # 3. Find and delete the multi-line propTypes definition.
  sed -e 's/import { iconType } from "..\/types";/import { IconType } from "..\/types";/' \
      -e "s/const ${component_name} = ({/const ${component_name}: React.FC<IconType> = ({/" \
      -e "/${component_name}.propTypes = {/,/};/d" \
      "$js_file" > "$tsx_file"
done

echo "All icons have been converted to TypeScript."
