import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCaterId } from '../components/redux/slices/filterSlice'
import Catagories from '../components/Catagories.jsx'
import PizzaSkeleton from '../components/PizzaBlock/Skeleton'
import PizzaBlock from '../components/PizzaBlock/index.jsx'
import Sort from '../components/Sort.jsx'
import Pagination from '../components/pagination/index.jsx'
import { SearchContext } from '../App.js'



const Home = () => {
	const dispatch = useDispatch()
	const { categoryId, sort } = useSelector(state => state.filter);
	const sortType = sort;
	const categoriesId = categoryId;

	const onClickCategory = (id) => {
		dispatch(setCaterId(id))
	}

	const { searchValue } = React.useContext(SearchContext)
	const [pizzas, setPizza] = React.useState([])
	const [isLoading, setIsLoading] = React.useState(false)
	const [currentPage, setCurrentPage] = React.useState(1)
	const fakeArr = [
		[undefined],
		[undefined],
		[undefined],
		[undefined],
		[undefined],
	]
	const searchsValue = searchValue ? `&search=${searchValue}` : ''
	React.useEffect(() => {
		setIsLoading(true)
		fetch(
			'https://64c4f551c853c26efada564f.mockapi.io/items?' +
			`${categoriesId === 0 ? '' : `category=${categoriesId}`}` +
			`&page=${currentPage}&limit=4` +
			`&sortBy=${sortType.propertyObjName}&order=${sortType.orderProperty}` +
			searchsValue
		)
			.then(response => {
				return response.json()
			})
			.then(arr => {
				setPizza(arr)
				setIsLoading(false)
			})

		window.scrollTo(0, 0)
	}, [categoriesId, sortType, searchValue, currentPage])
	const pizzasFilter = pizzas.filter(obj => {
		return obj.title.toLowerCase().includes(searchValue.toLowerCase())
	})
	pizzasFilter.map(obj => {
		return <PizzaBlock key={obj.id} {...obj} />
	})

	return (
		<>
			<div className='container'>
				{' '}
				<div className='content__top'>
					<Catagories
						value={categoriesId}
						onClickCategory={i => onClickCategory(i)}
					/>
					<Sort />
				</div>
				<h2 className='content__title'>Все пиццы</h2>
				<div className='content__items'>
					{isLoading
						? fakeArr.map(obj => {
							return <PizzaSkeleton key={obj.id} {...obj} />
						})
						: pizzasFilter
							? pizzasFilter.map(obj => {
								return <PizzaBlock key={obj.id} {...obj} />
							})
							: pizzas.map(obj => {
								return <PizzaBlock key={obj.id} {...obj} />
							})}
				</div>
				<Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
			</div>
		</>
	)
}

export default Home
