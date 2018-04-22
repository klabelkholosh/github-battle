import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/Api';
import Loading from './Loading';

//example of a private component - this one for the language list item used by SelectLanguage sfc
function LangItem (props) {
	const { style, onClick, lang } = props;
	return (
		<li 
			style={style}
			onClick={onClick}
			key={lang}>
				{lang}
		</li>
	)
}

// sfc for displaying the little language selection bar
function SelectLanguage ({ selectedLanguage, onSelect }) {
	const languages = ['All','JavaScript','Ruby','Java','CSS','Python']; 
	return (
		<ul className='languages'>
				{languages.map ((lang) => (
						<LangItem 
							key={lang}
							style={lang === selectedLanguage ? { color: '#d0021b'} : null}
							onClick={() => onSelect(lang)}
							lang={lang} />
					) 
				)}
			</ul>
	)
}


SelectLanguage.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired, 
}

//sfc, the grid which contains the repos provided to it by Popular component.
function RepoGrid (props) {
	const { repos } = props;
	return (
		<ul className='popular-list'>
			{repos.map(({ name, stargazers_count, owner, html_url }, index) => (
					<li key={name} className='popular-item'>
						<div className='popular-rank'>#{index + 1}</div>
						<ul className='space-list-items'>
							<li>
								<img
									className='avatar'
									src={owner.avatar_url}
									alt={'Avatar for ' + owner.login} 
								/> 
							</li>
							<li><a href={html_url}>{name}</a></li>
							<li>@{owner.login}</li>
							<li>{stargazers_count} stars</li>
						</ul>
					</li>
				)
			)}
		</ul>
	)
}

RepoGrid.propTypes = {
	repos: PropTypes.array.isRequired,
}

//this component fetches the most popular repos using a GitHub API call, depending on language clicked
class Popular extends React.Component {

	//initial state setting
	state = {
		selectedLanguage: 'All',
		repos: null,
	}

	//lifecycle event - when comp first mounts, get default All repos!
	componentDidMount () {
		// AJAX
		this.updateLanguage(this.state.selectedLanguage)
	}

	updateLanguage = async (lang) => {

		this.setState(() => ({
				selectedLanguage: lang,
				repos: null,
		}));

		const repos = await fetchPopularRepos(lang);
		this.setState(() => ({ repos }));
			
	}

	render() {
		const { selectedLanguage, repos } = this.state;
		return (
			<div>
			<SelectLanguage 
				selectedLanguage={selectedLanguage}
				onSelect={this.updateLanguage}
			/>
			{!repos
				? <Loading />
				: <RepoGrid repos={repos} />
			}
			</div>
		)
	}
}

export default Popular;
