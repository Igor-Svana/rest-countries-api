import './gobackbutton.css';
import { ICountryDetail } from '../../App';

interface IBackButton {
    bg: string,
    onClick: (value: React.SetStateAction<ICountryDetail>) => void
}

const GoBackButton = ({bg, onClick}: IBackButton) => {
    return (
        <div className='btn-back-container' style={{background: bg}} onClick={() => onClick({displayed: false, country: ""})}>
            <i className="fa-solid fa-arrow-left-long"></i>
            <span>Back</span>
        </div>
    )
}

export default GoBackButton;

