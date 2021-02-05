import React, {useContext, createContext, useState, useEffect} from 'react';


const TagContext = createContext();

export const TagProvider = ({location, children}) => {

   
    const [tag, setTag] = useState('');

    useEffect(() => {
        if (!location) return
        let tag_ = location.pathname.replace('/', '').replace('memorias-', '')
        setTag(tag_);
    }, [location]);
    

    return (
        <TagContext.Provider value={tag}>
            {children}
        </TagContext.Provider>
    )    
            
}

export const useTag = () => useContext(TagContext);