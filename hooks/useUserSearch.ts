import { useState } from "react";
import { useDebounce } from "./useDebounce";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";

export function useUserSearch() {
    const [searchTerm, setSearchTerm] = useState("")
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const isDebouncing = searchTerm !== debouncedSearchTerm;
    const queryArg = debouncedSearchTerm.trim() ? { searchTerm: debouncedSearchTerm } : "skip";

    const searchResults = useQuery(api.users.searchUsers, queryArg);

    const isQueryLoading = searchResults === undefined && debouncedSearchTerm.trim() !== "";

    return {
        searchTerm,
        setSearchTerm,
        searchResults: (searchResults || []) as Doc<"users">[],
        isLoading: isDebouncing || isQueryLoading,
    }
}
