"use client";

function SearchBar({ searchText, setSearchText, theme}) {
    return (
        <div>

            <input
                type="text"
                placeholder="Search notes by title"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className={` border w-full p-2 rounded outline-0 ${theme === "dark" ? " placeholder:text-slate-400" : ""}`}
            />
        </div>
    )
}

export default SearchBar