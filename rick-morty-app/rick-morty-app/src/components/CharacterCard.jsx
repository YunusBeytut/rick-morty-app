import './CharacterCard.css';

//The card that opens when we click on any character

function CharacterCard({ character }) {
    return (
        <div className="character-card-container">
            <div className="character-card-modern">
                <img src={character.image} alt={character.name} className="character-card-img" />
                <div className="character-card-info">
                    <h2>{character.name}</h2>
                    <p><strong>Status:</strong> {character.status}</p>
                    <p><strong>Gender:</strong> {character.gender}</p>
                    <p><strong>Species:</strong> {character.species}</p>
                    <p><strong>Location:</strong> {character.location.name}</p>
                </div>
            </div>
        </div>
    );
}

export default CharacterCard;