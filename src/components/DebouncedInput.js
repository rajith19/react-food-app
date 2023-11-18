import { useState, useEffect } from "react";
import useDebounce from "../utils/useDebounce";

const DebouncedInput = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms delay
 
    useEffect(() => {
       if (debouncedSearchTerm) {
          // Perform the search or API call with debouncedSearchTerm
          console.log('Searching for:', debouncedSearchTerm);
       }
    }, [debouncedSearchTerm]);
 
    return (
       <div>
          <input
             type="text"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             placeholder="Search here..."
          />
       </div>
    );
 };
 
 export default DebouncedInput;
 