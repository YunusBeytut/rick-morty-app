import './CharacterTable.css';
import CharacterCard from './CharacterCard';


//Table layout
function CharacterTable({ data, onSelect, selectedCharacter }) {
    return (
        <table className="character-table">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Gender</th>
                </tr>
            </thead>
            <tbody>
                {data.map(character => (
                    <>
                        <tr
                            key={character.id}
                            onClick={() => onSelect(selectedCharacter && selectedCharacter.id === character.id ? null : character)}
                            className="character-row"
                        >
                            <td>
                                <img src={character.image} alt={character.name} className="character-image" />
                            </td>
                            <td>{character.name}</td>
                            <td>{character.status}</td>
                            <td>{character.gender}</td>
                        </tr>
                        {selectedCharacter && selectedCharacter.id === character.id && (
                            <tr className="card-row">
                                <td colSpan="4">
                                    <CharacterCard character={selectedCharacter} />
                                </td>
                            </tr>
                        )}
                    </>
                ))}
            </tbody>
        </table>
    );
}

export default CharacterTable;