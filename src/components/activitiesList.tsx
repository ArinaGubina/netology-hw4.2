import type { Item } from './Item'

interface ActivitiesList{
  items : Item[],
  key: number,
  deleteItem : React.MouseEventHandler<HTMLElement>
 }

const ActivitiesList = ( props : ActivitiesList ) => {
  const list = props.items.sort((firstItem, secondItem) => { if(firstItem.itemDate > secondItem.itemDate) return -1; else return 1;});
  const sortedList = list.map((item, key) => {
    const dateArray = item.itemDate.split("-");
    const outputDate = `${dateArray[2]}.${dateArray[1]}.${dateArray[0]}`;
    return (
      <div className='activity-item' key={key}>
        <div className='activity-info'>{outputDate}</div>
        <div className='activity-info'>{item.itemDistance}</div>
        <div className='activity-info'>
          <div className='activity-action'>&#9997;</div>
          <div className='activity-action' onClick={props.deleteItem} data-id={key}>&#128465;</div>
        </div>
      </div>
    )
  });
  
  return(
    <div className="activities-list">{sortedList}</div>
  )
}

export default ActivitiesList