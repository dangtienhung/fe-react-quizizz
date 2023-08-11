import ActionableContent from './components/ActionableContent';
import FeatureQuizizz from '../../components/FeatureQuizizz/FeatureQuizizz';
import LayoutDefault from '../../layouts/LayoutDefault';

const HomePage = () => {
	return (
		<LayoutDefault>
			<ActionableContent />
			<FeatureQuizizz />
		</LayoutDefault>
	);
};

export default HomePage;
