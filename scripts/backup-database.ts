import { exec } from 'child_process'
import { promisify } from 'util'
import * as fs from 'fs'
import * as path from 'path'

const execAsync = promisify(exec)

/**
 * Database Backup Script for PostgreSQL
 * 
 * This script creates a backup of your PostgreSQL database using pg_dump
 * 
 * Usage:
 *   npm run db:backup
 * 
 * Requirements:
 *   - PostgreSQL installed with pg_dump available
 *   - DATABASE_URL environment variable set
 */

async function backupDatabase() {
    const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0]
    const backupDir = path.join(process.cwd(), 'backups')
    const backupFile = path.join(backupDir, `backup-${timestamp}.sql`)

    console.log('🔄 Starting database backup...\n')

    try {
        // Create backups directory if it doesn't exist
        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir, { recursive: true })
            console.log('📁 Created backups directory')
        }

        // Parse DATABASE_URL
        const databaseUrl = process.env.DATABASE_URL
        if (!databaseUrl) {
            throw new Error('DATABASE_URL environment variable is not set')
        }

        // Extract connection details from DATABASE_URL
        // Format: postgresql://username:password@host:port/database
        const urlPattern = /postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/
        const match = databaseUrl.match(urlPattern)

        if (!match) {
            throw new Error('Invalid DATABASE_URL format. Expected: postgresql://username:password@host:port/database')
        }

        const [, username, password, host, port, database] = match
        const cleanDatabase = database.split('?')[0] // Remove query parameters

        console.log(`📊 Database: ${cleanDatabase}`)
        console.log(`🖥️  Host: ${host}:${port}`)
        console.log(`💾 Backup file: ${backupFile}\n`)

        // Set password environment variable for pg_dump
        const env = { ...process.env, PGPASSWORD: password }

        // Run pg_dump command
        const command = `pg_dump -h ${host} -p ${port} -U ${username} -d ${cleanDatabase} -F p -f "${backupFile}"`

        console.log('⏳ Creating backup (this may take a moment)...')

        const { stdout, stderr } = await execAsync(command, { env })

        if (stderr && !stderr.includes('WARNING')) {
            console.warn('⚠️  Warnings:', stderr)
        }

        // Check if backup file was created
        if (!fs.existsSync(backupFile)) {
            throw new Error('Backup file was not created')
        }

        const stats = fs.statSync(backupFile)
        const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2)

        console.log('\n✅ Backup completed successfully!')
        console.log(`📁 File: ${backupFile}`)
        console.log(`📊 Size: ${fileSizeInMB} MB`)
        console.log('\n💡 To restore this backup, run:')
        console.log(`   npm run db:restore ${path.basename(backupFile)}`)

    } catch (error) {
        console.error('\n❌ Backup failed:', error)

        if (error instanceof Error) {
            if (error.message.includes('pg_dump')) {
                console.error('\n💡 Make sure PostgreSQL is installed and pg_dump is in your PATH')
                console.error('   Windows: pg_dump is typically in C:\\Program Files\\PostgreSQL\\16\\bin')
                console.error('   Add this to your PATH environment variable or use full path to pg_dump')
            }
        }

        throw error
    }
}

/**
 * Restore database from backup
 */
async function restoreDatabase(backupFileName: string) {
    const backupDir = path.join(process.cwd(), 'backups')
    const backupFile = path.join(backupDir, backupFileName)

    console.log('🔄 Starting database restore...\n')

    try {
        // Check if backup file exists
        if (!fs.existsSync(backupFile)) {
            throw new Error(`Backup file not found: ${backupFile}`)
        }

        // Parse DATABASE_URL
        const databaseUrl = process.env.DATABASE_URL
        if (!databaseUrl) {
            throw new Error('DATABASE_URL environment variable is not set')
        }

        const urlPattern = /postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/
        const match = databaseUrl.match(urlPattern)

        if (!match) {
            throw new Error('Invalid DATABASE_URL format')
        }

        const [, username, password, host, port, database] = match
        const cleanDatabase = database.split('?')[0]

        console.log(`📊 Database: ${cleanDatabase}`)
        console.log(`📁 Backup file: ${backupFile}\n`)

        // Set password environment variable for psql
        const env = { ...process.env, PGPASSWORD: password }

        // Run psql command to restore
        const command = `psql -h ${host} -p ${port} -U ${username} -d ${cleanDatabase} -f "${backupFile}"`

        console.log('⏳ Restoring backup (this may take a moment)...')

        await execAsync(command, { env })

        console.log('\n✅ Restore completed successfully!')

    } catch (error) {
        console.error('\n❌ Restore failed:', error)
        throw error
    }
}

// Main execution
const args = process.argv.slice(2)
const isRestore = args[0] === 'restore'

if (isRestore) {
    const backupFileName = args[1]
    if (!backupFileName) {
        console.error('❌ Please provide backup filename')
        console.error('Usage: npm run db:restore <backup-filename>')
        process.exit(1)
    }
    restoreDatabase(backupFileName)
        .then(() => process.exit(0))
        .catch(() => process.exit(1))
} else {
    backupDatabase()
        .then(() => process.exit(0))
        .catch(() => process.exit(1))
}
