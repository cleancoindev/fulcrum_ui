import { ReactComponent as SearchIcon } from 'app-images/icon-search.svg'
import React, { ChangeEvent, useState } from 'react'
import GovernanceVM from './GovernanceVM'
import Proposals from './Proposals/Proposals'
import GovernanceItem from './GovernanceItem'

export default function Governance({ vm }: { vm: GovernanceVM }) {
  const governanceTable = [
    {
      description: 'New Formalized Proposal Flow',
      author: '0x81eb...9c2d',
      action: 'Active'
    },
    {
      description: 'Force YAMv2 Mitigation to YAMv3 to Keep Community Consensus United',
      author: '0x81eb...9c2d',
      action: 'Closed'
    }
  ]

  return (
    <React.Fragment>
      <Proposals vm={vm} />
      <div className="panel--white padded-2 margin-bottom-2 governance">
        <div className="governance__search">
          <input
            value={vm.name}
            placeholder="Search"
            onChange={(e) => (vm.name = e.target.value)}
          />
          <div className="governance__search__button" onClick={vm.search}>
            <SearchIcon />
          </div>
        </div>
        <div className="governance__table">
          <div className="thead">
            <div className="thead__description">Description</div>
            <div className="thead__right">
              <div className="thead__author">Author</div>
              <div className="thead__action">Action</div>
            </div>
          </div>
          <div className="tbody">
            {governanceTable.map((item, index) => {
              return (
                <GovernanceItem
                  key={index}
                  description={item.description}
                  author={item.author}
                  action={item.action}
                  openProposals={vm.proposals.show}
                />
              )
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
