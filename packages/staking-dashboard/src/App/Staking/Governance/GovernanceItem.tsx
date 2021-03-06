import React from 'react'
import GovernanceProposal from 'src/domain/GovernanceProposal'
import hashUtils from 'app-lib/hashUtils'


export interface IGovernanceItemProps {
  proposal: GovernanceProposal
  openProposals: (id: number) => void
}

export default function GovernanceItem(props: IGovernanceItemProps) {
  const { title, proposer, state, id } = props.proposal
  return (
    <div className="trow" onClick={() => props.openProposals(id)}>
      <div className="trow__description">{title} </div>
      <div className="trow__right">
        <div className="trow__author">{hashUtils.shortHash(proposer)}</div>
        <div className="trow__action">
          <button className={`${state.toLocaleLowerCase()}`}>{state}</button>
        </div>
      </div>
    </div>
  )
}
