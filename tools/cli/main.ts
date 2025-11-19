import chalk from 'chalk'
import { spawn } from 'child_process'

async function run(cmd: string) {
  return new Promise<void>((resolve, reject) => {
    const child = spawn(cmd, { shell: true, stdio: 'inherit' })

    child.on('close', (code) => {
      if (code === 0) resolve()

      reject(new Error(chalk.red(`Command exited with code ${code}`)))
    })
  })
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function main() {
  // Start docker containers
  console.log(chalk.cyan.bold('Starting Docker containers...'))
  await run('docker compose up -d')

  // Wait for postgres
  console.log(chalk.cyan.bold('\nWaiting for PostgreSQL'))
  for (let i = 0; i < 30; i++) {
    try {
      await run('docker compose exec -T postgres pg_isready -U postgres')
      break
    } catch {
      await sleep(1000)
    }
  }

  // Clean old database and seed new
  console.log(chalk.cyan.bold('\nSeeding database...'))
  await run('npx prisma db push --force-reset')
  await run(
    'docker compose exec -T postgres psql -U postgres -d music-library-api < prisma/seed.sql'
  )

  // Start server
  console.log(chalk.cyan.bold('\nStarting server...'))
  await run('nodemon src/server.ts')
}

main()
