import { cp, mkdir, stat } from 'node:fs/promises'
import { resolve } from 'node:path'

const kit = resolve(process.argv[2] ?? 'gearui-kit')
const output = resolve('docs/.vitepress/dist/gearui-kit/demo')
const files = [
  ['sample/jsApp/src/jsMain/resources/index.html', 'index.html'],
  ['sample/build/kotlin-webpack/js/productionExecutable/gearui_sample.js', 'gearui_sample.js'],
  ['sample/jsApp/build/kotlin-webpack/js/productionExecutable/jsApp.js', 'jsApp.js'],
]

await stat(resolve('docs/.vitepress/dist/index.html'))
await mkdir(output, { recursive: true })

for (const [source, name] of files) {
  const file = resolve(kit, source)
  const { size } = await stat(file)
  if (size === 0) throw new Error(`Empty Web demo asset: ${file}`)
  await cp(file, resolve(output, name))
  console.log(`${name}: ${(size / 1024 / 1024).toFixed(2)} MiB`)
}

await cp(
  resolve(kit, 'sample/jsApp/build/generated/webResources/assets'),
  resolve(output, 'assets'),
  { recursive: true },
)
console.log(`Web demo staged at ${output}`)
