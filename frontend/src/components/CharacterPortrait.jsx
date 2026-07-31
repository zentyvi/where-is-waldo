function CharacterPortrait({ character }) {
  return (
    <div>
      <img src={character.imageUrl} alt={`${character.name}`} />
      <span>{character.name}</span>
    </div>
  );
}

export default CharacterPortrait;
