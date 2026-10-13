import './../pages/Home.css'

type RingProps = { 
    percent : number,
    size?: number
}

const HabitsCompletion = ({percent, size = 160}: RingProps) => {

    const p = Math.min(100, Math.max(0, percent))

  return (
    <div className="HabitCard">
        <h3>Habit completion</h3>
        <div className="stats">
             <div className="round"
                style={{
                    width: size,
                    height: size,
                    borderRadius: '50%',
                    background: `conic-gradient(#b8ff4f ${p}%, #2c2c2e ${p}% 100%)`,
                    transition: 'background 0.6s ease',
                    WebkitMask: 'radial-gradient(circle, transparent 60%, black 61%)',
                    mask: 'radial-gradient(circle, transparent 60%, black 61%)',
                }}
                />

                    
                

                <h1 className="percentage">{p} %</h1>
        </div>

    </div>
  )
}

export default HabitsCompletion