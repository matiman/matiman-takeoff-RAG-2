export default async function Home() {
  const response = await fetch('/api/db');
  const facts = await response.json();
  
  return (
    <main>
      <h1>Facts</h1>
      <ul>
        {facts.map((fact) => (
          <li key={fact.id}>{fact.content}</li>
        ))}
      </ul>
    </main>
  );
} 