import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Get the module name from command-line arguments
const moduleName = process.argv[2]

if (!moduleName) {
  console.error('Please provide a module name.')
  process.exit(1)
}

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Define the module path
const modulePath = path.join(__dirname, '../src/modules', moduleName)

// Define the subdirectories
const directories = [
  'api',
  'components',
  'constants',
  'pages',
  'stores',
  'types',
]

// Define the files and their content
const files = {
  [`${moduleName}Module.vue`]: `
<script setup>
const route = useRoute();
</script>
<template>
  <v-main>
    <router-view :key="route.fullPath" />
  </v-main>
</template>
`,
  'router.js': `export const routes = [
  {
    path: '/${moduleName}',
    name: '${moduleName}',
    component: () => import('./${moduleName}Module.vue'),
    children: [],
  },
];
`,
  'index.js': `import { routes } from './router';

export default {
  routes,
};
`,
}

// Create the module directory if it doesn't exist
if (!fs.existsSync(modulePath)) {
  fs.mkdirSync(modulePath, { recursive: true })
  console.log(`Created module directory: ${modulePath}`)
} else {
  console.error(`Module directory already exists: ${modulePath}`)
  process.exit(1)
}

// Create the subdirectories
directories.forEach((dir) => {
  const dirPath = path.join(modulePath, dir)
  fs.mkdirSync(dirPath)
  console.log(`Created directory: ${dirPath}`)
})

// Create the files
Object.entries(files).forEach(([fileName, content]) => {
  const filePath = path.join(modulePath, fileName)
  fs.writeFileSync(filePath, content)
  console.log(`Created file: ${filePath}`)
})

console.log(`Module ${moduleName} created successfully.`)
