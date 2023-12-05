import { Item } from "./Item"
import  cardapio  from "./itens.json"
import styles from './Itens.module.scss'


export const Itens = () => {
    return (
        <div className={styles.itens}>
            {cardapio.map(item => (
              <Item 
                key={item.id}
                title={item.title}
                description={item.description}
                id={item.id}
                photo={item.photo}
                price={item.price}
                serving={item.serving}
                category={item.category}
                size={item.size}
                />
            ))}
        </div>
    )
}