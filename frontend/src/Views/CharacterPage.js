import React from 'react';
import "./CharacterPage.css";

function CharacterPage() {
  return (
    <div id="CharacterPage">
      <h1>Character Page</h1>
      <div id="quickInfo">
        <div className="abilityScores">
          <div className="quickInfoContainer">
            <label className="Summary">Strength</label>
            <button className="modifier">+0</button>
            <label className="abilityScore">10</label>
          </div>
          <div className="quickInfoContainer">
            <label className="Summary">Dexterity</label>
            <button className="modifier">+0</button>
            <label className="abilityScore">10</label>
          </div>
          <div className="quickInfoContainer">
            <label className="Summary">Constitution</label>
            <button className="modifier">+0</button>
            <label className="abilityScore">10</label>
          </div>
          <div className="quickInfoContainer">
            <label className="Summary">Intelligence</label>
            <button className="modifier">+0</button>
            <label className="abilityScore">10</label>
          </div>
          <div className="quickInfoContainer">
            <label className="Summary">Wisdom</label>
            <button className="modifier">+0</button>
            <label className="abilityScore">10</label>
          </div>
          <div className="quickInfoContainer">
            <label className="Summary">Charisma</label>
            <button className="modifier">+0</button>
            <label className="abilityScore">10</label>
          </div>
        </div>
        <div className="quickInfoContainer">
          <label className="Summary">Proficiency</label>
          <div id="modifier" className="modifier">
            +0
          </div>
          <label>Bonus</label>
        </div>
        <div className="quickInfoContainer">
          <label className="Summary">Walking</label>
          <div id="modifier" className="modifier">
            30ft.
          </div>
          <label>Speed</label>
        </div>
        <div className="HitPointsParent">
          <div className="HitPointsContainer">
            <div id="HealthControllerContainer">
              <button>Heal</button>
              <input type="number" defaultvalue="{0}/" />
              <button>Damage</button>
            </div>
            <div id="HPContainer">
              <div className="divider">
                <label>Current</label> <br />
                <label id="currentHP">0</label> <br />
              </div>
              <div className="divider">
                <label /> <br />
                <label>/</label> <br />
                <label>Hit Points</label> <br />
              </div>
              <div className="divider">
                <label>Max</label> <br />
                <label id="maxHP">0</label> <br />
              </div>
            </div>
            <div id="TempHPContainer">
              <label>Temp</label>
              <input name="tempHP" type="number" defaultvalue="{0}/" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterPage;
