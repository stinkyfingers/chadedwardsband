import React from 'react';
import fullBandStagePlot from '../images/CE_StagePlot_FullBand.jpg';
import '../css/tech.css';



const Tech = () => {
  const handleOpen = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="Tech">
      <div className="stagePlotFull">
        <h6>Full Band Stage Plot</h6>
        <img className='stagePlotImage' src={fullBandStagePlot} alt="stage_plot_full_band" onClick={() => handleOpen(fullBandStagePlot)}/>
      </div>
    </div>
  );
}

export default Tech;
