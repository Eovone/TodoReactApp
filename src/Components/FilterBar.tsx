import { FC } from 'react';
import FilterButton from './FilterButton';

interface FilterBarProps {
    filterState: string;
    setFilterState: (newFilterState: string) => void;
}

const FilterBar: FC<FilterBarProps> = (props) => {  
    return (
        <div className='flex justify-center'>
            <FilterButton buttonName='All'
                          setFilterState={props.setFilterState}
                          filterState='all' />
            <FilterButton buttonName='Not Done' 
                          setFilterState={props.setFilterState}
                          filterState='notdone'/>
            <FilterButton buttonName='Done' 
                          setFilterState={props.setFilterState}
                          filterState='done'/>
        </div>
    );      
}

export default FilterBar;