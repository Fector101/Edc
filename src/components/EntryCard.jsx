import { Link } from "react-router-dom";

export default function EntryCard({ entry }) {
  return (
    <Link to={`/entry/${entry.id}`}>
      <div className="bg-white shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition relative">
        <h3 className="text-xl font-bold">{entry.title}</h3>
        <h4 className="text-gray-600">{entry.location}</h4>
        <p className="text-gray-800 line-clamp-3">{entry.rating}</p>
        <p className="text-sm text-gray-500">{entry.date}</p>
      </div>
    </Link>
  );
}
