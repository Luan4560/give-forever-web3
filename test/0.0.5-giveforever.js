import { expect } from 'chai'
import { ethers} from 'hardhat'

describe('GiveForever', function () {
  let giveForever, owner;

  before(async function () {
    [owner] = await ethers.getSigners();
    const GiveForever = await ethers.getContractFactory('GiveForever');
    giveForever = await GiveForever.deploy();
  })

  it('Should return a charity address', async function () {
    const tx1 = await giveForever.charity();
    expect(tx1).to.equal(owner.address);
  })
})

