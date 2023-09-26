import { FC } from 'react';

interface FilterButtonProps {
  buttonName?: string;
  filterState: string;
  setFilterState: (newFilterState: string) => void;
  isActive : boolean;
}

const FilterButton: FC<FilterButtonProps> = (props) => {

    const handleOnClick = () => {
        props.setFilterState(props.filterState);
    };

    const isActiveCss = "w-1/4 m-2 rounded-md overflow-hidden dark:bg-gray-500 border-2 border-yellow-400";
    const isNotActiveCss = "w-1/4 m-2 rounded-md overflow-hidden dark:bg-gray-500";
         
    return (
        <div className={props.isActive ? isActiveCss : isNotActiveCss}>
            <button className="w-full px-4 py-2 text-white bg-gray-500 hover:bg-gray-700 transition-transform transform hover:scale-105 focus:outline-none"
                    onClick={handleOnClick}
                    >{props.buttonName}</button>
        </div>     
    );
      
}

export default FilterButton;