// https://esbuild.github.io/getting-started/
import esbuild from 'esbuild'
const NODE_ENV = process.env.NODE_ENV
if (NODE_ENV === 'development') {
  const ctx = await esbuild.context({
    entryPoints: ['src/**/*.ts'],
    format: 'esm',
    minify: false,
    outdir: 'out',
    platform: 'node',
    target: ['node16']
  })
  ctx
    .watch()
    .then(() => {
      console.log('Build and watching...')
    })
    .catch((err) => {
      console.log('Build failed')
      console.log(err)
    })
} else {
  esbuild
    .build({
      entryPoints: ['src/index.ts'],
      outfile: 'dist/index.js',
      minify: true,
      platform: 'node',
      format: 'esm',
      external: ['express', 'cors', 'node:path']
    })
    .then(() => {
      console.log('Build successful')
    })
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}
