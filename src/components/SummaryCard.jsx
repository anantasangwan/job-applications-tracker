
const SummaryCard = ({bg, bt, src, value, text}) => {
    return (
        <div style={{backgroundColor: bg, borderTopColor: bt}} className="card">
            <div>
                <img src={src} alt="" />
                <span>{value}</span>
            </div>
            <div>{text}</div>
        </div>
    )
}

export default SummaryCard
