import fs from 'fs'
import path from 'path'
import solc from 'solc'

const buildPath = path.resolve(__dirname, 'build')
fs.rmSync(buildPath, { recursive: true, force: true })

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol')
const source = fs.readFileSync(campaignPath, 'utf-8')
const output = solc.compile<':Campaign' | ':CampaignFactory'>(source, 1).contracts

fs.mkdirSync(buildPath)

for (const contract in output) {
  const contractName = contract as keyof typeof output
  fs.writeFileSync(
    path.resolve(buildPath, `${contractName.replace(':', '')}.json`),
    JSON.stringify(output[contractName], null, 4)
  )
}
