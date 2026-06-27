"use client";

function SearchBar({ searchText, setSearchText, theme}) {
    return (
        <div className=" w-6/12">

            <input
                type="text"
                placeholder="Search notes by title"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className={` border w-full px-2 py-1 rounded-lg outline-0 ${theme === "dark" ? " placeholder:text-slate-400" : ""}`}
            />
        </div>
    )
}

export default SearchBar