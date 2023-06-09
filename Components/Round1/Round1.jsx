import React, { Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../Loading/Loading';

function Round1({ surahs, setSurahs }) {
    const navigate = useNavigate();
    const suars = surahs.filter((surah) => surah.number >= 78)
    const suarsItem = suars.map((surah) => {
        return (
            <div key={surah.number} className="cursor-pointer" onClick={() => navigate(`/round1/${surah.number}`)}>
                <div className='words'>
                    <h2 className="category_name">{surah.name}</h2>
                </div>
            </div>
        )
    })
    const suarsItemLength = Math.floor(suarsItem.length / 2);
    const firstHalf = suarsItem.slice(0, suarsItemLength);
    const secondHalf = suarsItem.slice(suarsItemLength);
    return (
        <div className="cats py-5">
            <Suspense fallback={<Loading />}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 ">
                            {firstHalf}
                        </div>
                        <div className="col-md-6 ">
                            {secondHalf}
                        </div>
                    </div>
                </div>
            </Suspense>
        </div>

    )
}

export default Round1