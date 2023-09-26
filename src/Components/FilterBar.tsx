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
                          filterState='all' 
                          isActive={props.filterState==="all" ? true : false}/>
            <FilterButton buttonName='Not Done' 
                          setFilterState={props.setFilterState}
                          filterState='notdone'
                          isActive={props.filterState==="notdone" ? true : false}/>
            <FilterButton buttonName='Done' 
                          setFilterState={props.setFilterState}
                          filterState='done'
                          isActive={props.filterState==="done" ? true : false}/>
        </div>
    );      
}

export default FilterBar;