import { PrismaClient as SQLitePrismaClient } from '@prisma/client'
import { PrismaClient as PostgreSQLPrismaClient } from '@prisma/client'

/**
 * Migration script to move data from SQLite to PostgreSQL
 * 
 * IMPORTANT: Before running this script:
 * 1. Ensure PostgreSQL is installed and running
 * 2. Create the target PostgreSQL database
 * 3. Update the DATABASE_URL in .env to point to PostgreSQL
 * 4. Run: npx prisma db push (to create tables in PostgreSQL)
 * 5. Then run this script: npx tsx scripts/migrate-sqlite-to-postgres.ts
 */

async function migrateSQLiteToPostgreSQL() {
    console.log('🚀 Starting SQLite to PostgreSQL migration...\n')

    // SQLite client (source)
    const sqliteClient = new SQLitePrismaClient({
        datasources: {
            db: {
                url: 'file:./dev.db' // SQLite database path
            }
        }
    })

    // PostgreSQL client (destination)
    // Make sure your .env DATABASE_URL points to PostgreSQL
    const postgresClient = new PostgreSQLPrismaClient()

    try {
        // Connect to both databases
        await sqliteClient.$connect()
        await postgresClient.$connect()
        console.log('✅ Connected to both databases\n')

        // Step 1: Migrate Users
        console.log('📊 Migrating Users...')
        const users = await sqliteClient.user.findMany()
        console.log(`Found ${users.length} users`)

        for (const user of users) {
            await postgresClient.user.upsert({
                where: { id: user.id },
                create: user,
                update: user
            })
        }
        console.log(`✅ Migrated ${users.length} users\n`)

        // Step 2: Migrate Investors
        console.log('📊 Migrating Investors...')
        const investors = await sqliteClient.investor.findMany()
        console.log(`Found ${investors.length} investors`)

        for (const investor of investors) {
            await postgresClient.investor.upsert({
                where: { id: investor.id },
                create: investor,
                update: investor
            })
        }
        console.log(`✅ Migrated ${investors.length} investors\n`)

        // Step 3: Migrate Posts
        console.log('📊 Migrating Posts...')
        const posts = await sqliteClient.post.findMany()
        console.log(`Found ${posts.length} posts`)

        for (const post of posts) {
            await postgresClient.post.upsert({
                where: { id: post.id },
                create: post,
                update: post
            })
        }
        console.log(`✅ Migrated ${posts.length} posts\n`)

        // Summary
        console.log('🎉 Migration completed successfully!')
        console.log('\nSummary:')
        console.log(`  - Users: ${users.length}`)
        console.log(`  - Investors: ${investors.length}`)
        console.log(`  - Posts: ${posts.length}`)
        console.log(`  - Total records: ${users.length + investors.length + posts.length}`)

    } catch (error) {
        console.error('❌ Migration failed:', error)
        throw error
    } finally {
        // Disconnect from both databases
        await sqliteClient.$disconnect()
        await postgresClient.$disconnect()
        console.log('\n✅ Disconnected from databases')
    }
}

// Run the migration
migrateSQLiteToPostgreSQL()
    .then(() => {
        console.log('\n✅ All done! Your data has been migrated to PostgreSQL.')
        console.log('💡 Remember to backup your SQLite database (dev.db) before deleting it.')
        process.exit(0)
    })
    .catch((error) => {
        console.error('\n❌ Migration failed:', error)
        process.exit(1)
    })
