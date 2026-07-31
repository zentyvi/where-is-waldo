function RecordsTable({ records }) {
  const rows = records.map((r, index) => {
    <tr key={r.id}>
      <th scope="row">{index + 1}</th>
      <td>{r.player.name}</td>
      <td>{r.time}</td>
      <td>
        {new Date(r.createdAt).toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric",
          year: "numeric",
        })}
      </td>
    </tr>;
  });

  return (
    <section>
      <table>
        <caption>Leaderboard</caption>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Time</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={4}>There is no records yet!</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}

export default RecordsTable;
