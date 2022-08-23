import React from 'react'
import UiButton from '../../components/ui/UiButton'


const PaymentsView = ({ title }: { title: string }) => {
  return (
      <div className="flex flex-col ">
      <div id="title" className="bg-gray-300 px-4">
        <div className="flex flex-row justify-between items-center">
          <h4 className="">{title}</h4>
          <div>
            <UiButton color="success" text="New Payment" size="sm" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentsView