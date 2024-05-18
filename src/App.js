import React, { useEffect, useState } from "react";
import "./index.css"; // Import the global CSS file
import logoIcon from "./images/logo.svg";

export default function App() {
  const [bill, setBill] = useState(0);
  const [people, setPeople] = useState(1);
  const [tip, setTip] = useState(0);
  const [isResetEnabled, setIsResetEnabled] = useState(false);

  useEffect(() => {
    if (bill > 0 && people > 0 && tip > 0) {
      setIsResetEnabled(true);
    } else {
      setIsResetEnabled(false);
    }
  }, [bill, people, tip]);

  const handleReset = () => {
    setBill(0);
    setPeople(1);
    setTip(0);
  };

  return (
    <main>
      <div className="container">
        <div className="logo">
          <img src={logoIcon} alt="logo" />
        </div>
        <div className="left-section">
          <BillInput setBill={setBill} bill={bill} />
          <TipSelection setTip={setTip} tip={tip} />
          <PeopleInput setPeople={setPeople} people={people} />
        </div>
        <div className="right-section">
          <ResultSection
            bill={bill}
            tip={tip}
            people={people}
            onReset={handleReset}
            isResetEnabled={isResetEnabled}
          />
        </div>
      </div>
    </main>
  );
}

function BillInput({ setBill, bill }) {
  const handleBillChange = (e) => {
    const value = parseFloat(e.target.value);
    if (value >= 0) {
      setBill(value);
    }
  };
  return (
    <div>
      <label>Bill</label>
      <div className="input-wrapper">
        <input
          label="Bill"
          value={bill}
          type="number"
          id="bill"
          onChange={handleBillChange}
        />
      </div>
    </div>
  );
}

function TipSelection({ setTip, tip }) {
  const [selectedTip, setSelectedTip] = useState(null);

  const handleTipClick = (value) => {
    setSelectedTip(value);
    setTip(value);
  };

  const handleCustomTip = (value) => {
    setTip(value);
    setSelectedTip("custom");
  };

  return (
    <div>
      <label htmlFor="tip">Select Tip %</label>
      <div className="tip-buttons">
        <TipButton
          isSelected={selectedTip === 0.05}
          onClick={() => handleTipClick(0.05)}
        >
          5%
        </TipButton>
        <TipButton
          isSelected={selectedTip === 0.1}
          onClick={() => handleTipClick(0.1)}
        >
          10%
        </TipButton>
        <TipButton
          isSelected={selectedTip === 0.15}
          onClick={() => handleTipClick(0.15)}
        >
          15%
        </TipButton>
        <TipButton
          isSelected={selectedTip === 0.25}
          onClick={() => handleTipClick(0.25)}
        >
          25%
        </TipButton>
        <TipButton
          isSelected={selectedTip === 0.5}
          onClick={() => handleTipClick(0.5)}
        >
          50%
        </TipButton>
        <TipButton
          isSelected={selectedTip === "custom"}
          onClick={() => setTip("custom")}
          isCustom={true}
          setTip={handleCustomTip}
        >
          Custom
        </TipButton>
      </div>
    </div>
  );
}

function TipButton({ children, onClick, isCustom, setTip, isSelected }) {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [customTip, setCustomTip] = useState(0);

  const handleButtonClick = () => {
    if (isCustom) {
      setIsInputVisible(true);
    } else {
      onClick();
    }
  };

  const handleInputChange = (e) => {
    const value = parseFloat(e.target.value);
    if (value >= 0) {
      setCustomTip(value);
      setTip(value / 100);
    }
  };

  return isInputVisible ? (
    <input
      type="number"
      placeholder="Custom"
      value={customTip}
      onChange={handleInputChange}
      onBlur={() => setIsInputVisible(true)}
      autoFocus
    />
  ) : (
    <button
      className={`${isSelected ? "selected" : ""} ${
        isCustom ? "custom-button" : ""
      }`}
      onClick={handleButtonClick}
    >
      {children}
    </button>
  );
}

function PeopleInput({ setPeople, people }) {
  const [isInvalid, setIsInvalid] = useState(false);
  const handlePeopleChange = (e) => {
    const value = parseFloat(e.target.value);
    if (value > 0) {
      setPeople(value);
      setIsInvalid(false);
    } else {
      setIsInvalid(true);
    }
  };
  return (
    <div className="people-input">
      <label htmlFor="people">Number of People</label>
      {isInvalid && <p className="error-message">Can't be zero</p>}
      <input
        value={people}
        onChange={handlePeopleChange}
        type="number"
        id="people"
        className={isInvalid ? "invalid-input" : ""}
      />
    </div>
  );
}

function ResultSection({ bill, tip, people, onReset, isResetEnabled }) {
  const tipAmountPerPerson = (bill * tip) / people;
  const totalPerPerson = bill / people + tipAmountPerPerson;
  return (
    <div className="result">
      <div className="tip-amount-container">
        <TipAmountPerPerson tipAmount={tipAmountPerPerson} />
        <TotalPerPerson total={totalPerPerson} />
      </div>
      <ResetButton isResetEnabled={isResetEnabled} onReset={onReset} />
    </div>
  );
}

function TipAmountPerPerson({ tipAmount }) {
  return (
    <div className="tip-amount">
      <label htmlFor="tip-amount">
        Tip Amount<p>/ person</p>
      </label>
      <input
        type="text"
        id="tip-amount"
        value={`$${tipAmount.toFixed(2)}`}
        disabled
      />
    </div>
  );
}

function TotalPerPerson({ total }) {
  return (
    <div className="tip-amount">
      <label htmlFor="total">
        Total <p>/ person</p>
      </label>
      <input type="text" id="total" value={`$${total.toFixed(2)}`} disabled />
    </div>
  );
}

function ResetButton({ onReset, isResetEnabled }) {
  return (
    <div className={isResetEnabled ? "reset-button" : "none"}>
      <button onClick={onReset}>RESET</button>
    </div>
  );
}
