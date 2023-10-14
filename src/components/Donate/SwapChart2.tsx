import * as React from 'react';

import TabChart from '../Swap/TabChart'
import SwapComp2 from './SwapComp2'

const SwapChart = () => {
    return (
        <>
            <section className='swapchart'>
                <div className="container mt-5 pt-lg-5 pt-3">
                    <div className="row mx-0 align-items-start gap-lg-0 gap-5">
                        <div className="col-lg-6">
                            <TabChart />
                        </div>
                        <div className="col-lg-6 mt-lg-4 pt-lg-2">
                            <SwapComp2 />
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}

export default SwapChart