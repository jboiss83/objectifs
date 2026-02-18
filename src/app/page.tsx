'use client';

import { useState } from 'react';
import './App.css';

interface Objectif {
  annuel: number;
  trimestriel: number;
  mensuel: number;
  hebdomadaire: number;
  journalier: number;
}

const JOURS_TRAVAILLES = 220; // ~220 jours travaillés par an

export default function Home() {
  const [objectifAnnuel, setObjectifAnnuel] = useState<number>(30000);
  const [joursPersonnalises, setJoursPersonnalises] = useState<number>(JOURS_TRAVAILLES);

  const objectifsPredefinis = [10000, 20000, 30000, 40000, 50000, 60000, 75000, 100000];

  const calculerObjectifs = (montantAnnuel: number): Objectif => {
    return {
      annuel: montantAnnuel,
      trimestriel: montantAnnuel / 4,
      mensuel: montantAnnuel / 12,
      hebdomadaire: montantAnnuel / 52,
      journalier: montantAnnuel / joursPersonnalises
    };
  };

  const objectifs = calculerObjectifs(objectifAnnuel);

  const pourcentageAtteint = (objectifTotal: number, actuel: number = 0) => {
    return Math.min((actuel / objectifTotal) * 100, 100);
  };

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>🚀 Mes Objectifs de Développeur</h1>
          <p className="subtitle">Transforme tes ambitions en réalité</p>
        </header>

        <div className="config-section">
          <div className="input-group">
            <label htmlFor="jours">Jours travaillés par an :</label>
            <input
              id="jours"
              type="number"
              value={joursPersonnalises}
              onChange={(e) => setJoursPersonnalises(Number(e.target.value))}
              min="150"
              max="365"
            />
          </div>
        </div>

        <div className="objectifs-grid">
          {objectifsPredefinis.map((montant) => {
            const obj = calculerObjectifs(montant);
            const isSelected = objectifAnnuel === montant;
            
            return (
              <div
                key={montant}
                className={`objectif-card ${isSelected ? 'selected' : ''}`}
                onClick={() => setObjectifAnnuel(montant)}
              >
                <div className="objectif-header">
                  <h2>{(montant / 1000)}K€</h2>
                  <span className="badge">par an</span>
                </div>
                
                <div className="objectif-details">
                  <div className="detail-row">
                    <span className="label">Par trimestre</span>
                    <span className="value">{obj.trimestriel.toFixed(0)}€</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Par mois</span>
                    <span className="value">{obj.mensuel.toFixed(0)}€</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Par semaine</span>
                    <span className="value">{obj.hebdomadaire.toFixed(0)}€</span>
                  </div>
                  <div className="detail-row highlight">
                    <span className="label">Par jour</span>
                    <span className="value">{obj.journalier.toFixed(0)}€</span>
                  </div>
                </div>

                {isSelected && (
                  <div className="selected-indicator">
                    ✓ Objectif sélectionné
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="custom-section">
          <h3>🎯 Définis ton propre objectif</h3>
          <div className="custom-input-group">
            <input
              type="number"
              value={objectifAnnuel}
              onChange={(e) => setObjectifAnnuel(Number(e.target.value))}
              min="1000"
              max="1000000"
              step="1000"
            />
            <span className="currency">€ / an</span>
          </div>
        </div>

        <div className="motivation-section">
          <h3>💪 Ton objectif actuel</h3>
          <div className="big-numbers">
            <div className="big-number primary">
              <span className="amount">{objectifs.annuel.toLocaleString('fr-FR')}€</span>
              <span className="period">par an</span>
            </div>
          </div>
          
          <div className="breakdown-grid">
            <div className="breakdown-card">
              <div className="breakdown-icon">📅</div>
              <div className="breakdown-amount">{objectifs.trimestriel.toFixed(0)}€</div>
              <div className="breakdown-label">par trimestre</div>
            </div>
            <div className="breakdown-card">
              <div className="breakdown-icon">📆</div>
              <div className="breakdown-amount">{objectifs.mensuel.toFixed(0)}€</div>
              <div className="breakdown-label">par mois</div>
            </div>
            <div className="breakdown-card">
              <div className="breakdown-icon">📊</div>
              <div className="breakdown-amount">{objectifs.hebdomadaire.toFixed(0)}€</div>
              <div className="breakdown-label">par semaine</div>
            </div>
            <div className="breakdown-card highlight-card">
              <div className="breakdown-icon">⚡</div>
              <div className="breakdown-amount">{objectifs.journalier.toFixed(0)}€</div>
              <div className="breakdown-label">par jour</div>
            </div>
          </div>
          
          <div className="tips">
            <h4>💡 Pour y arriver :</h4>
            <ul>
              <li>Fixe-toi des objectifs réalistes et progressifs</li>
              <li>Monte en compétences sur des technologies demandées</li>
              <li>Construis un portfolio solide</li>
              <li>Network et visibilité sont essentiels</li>
              <li>Sois régulier et persévérant</li>
            </ul>
          </div>
        </div>

        <footer className="footer">
          <p>Créé avec ❤️ pour les développeurs ambitieux</p>
        </footer>
      </div>
    </div>
  );
}
