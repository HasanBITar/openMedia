import { useEffect, useState } from "react";
import NavSearch from "../navbar/NavSearch";
import TagCard from "../cards/TagCard";

function TagSection() {
  //INSERT TAG DATA HERE
  const [originalTags] = useState([
    { tag_id: "id1", name: "Tag1", color: "#000000" },
    { tag_id: "id2", name: "Tag2", color: "#00ff00" },
    { tag_id: "id3", name: "Tag3", color: "#0000ff" },
  ]);
  const [tags, setTags] = useState(originalTags);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    if (searchQuery === "") {
      setTags(originalTags);
    } else {
      const filteredTags = originalTags.filter((tag) =>
        tag.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setTags(filteredTags);
    }
  }, [searchQuery, originalTags]);
  return (
    <div>
      <h3 className="text-3xl font-bold my-4">Filter By Tag</h3>
      <NavSearch value={searchQuery} onChange={handleSearch} />

      {tags.map((tag) => (
        <TagCard
          key={tag.tag_id}
          id={tag.tag_id}
          name={tag.name}
          color={tag.color}
        />
      ))}
    </div>
  );
}

export default TagSection;
