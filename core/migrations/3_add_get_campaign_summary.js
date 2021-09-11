const campaignFactoryContract = artifacts.require('CampaignFactory')

module.exports = function (deployer) {
  deployer.deploy(campaignFactoryContract)
}
