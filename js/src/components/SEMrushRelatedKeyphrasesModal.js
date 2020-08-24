/* External dependencies */
import { Fragment, Component } from "@wordpress/element";
import { Slot } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import PropTypes from "prop-types";

/* Yoast dependencies */
import { Button } from "@yoast/components/src/button";
import { ButtonStyledLink } from "@yoast/components";

/* Internal dependencies */
import { ModalContainer } from "./modals/Container";
import Modal from "./modals/Modal";
import YoastIcon from "../../../images/Yoast_icon_kader.svg";

/**
 * Redux container for the RelatedKeyPhrasesModal modal.
 */
class SEMrushRelatedKeyphrasesModal extends Component {
	/**
	 * Constructs the RelatedKeyPhrasesModal component.
	 *
	 * @param {Object} props The properties.
	 *
	 * @returns {void}
	 */
	constructor( props ) {
		super( props );

		this.onModalOpen  = this.onModalOpen.bind( this );
		this.onModalClose = this.onModalClose.bind( this );
	}

	/**
	 * Handles the click event on the "Get related keyphrases" button.
	 *
	 * @returns {void}
	 */
	onModalOpen() {
		// Add not-logged in logic here.

		if ( ! this.props.keyphrase.trim() ) {
			this.props.onOpenWithNoKeyphrase();
			return;
		}

		this.props.onOpen( this.props.location );
	}

	/**
	 * Handles the close event for the modal.
	 *
	 * @returns {void}
	 */
	onModalClose() {
		this.props.onClose();
	}

	/**
	 * Opens the popup window.
	 *
	 * @param {event} e The click event.
	 *
	 * @returns {void}
	 */
	onLinkClick( e ) {
		const url = "https://oauth.semrush.com/oauth2/authorize?" +
			"ref=1513012826&client_id=yoast&redirect_uri=https%3A%2F%2Foauth.semrush.com%2Foauth2%2Fyoast%2Fsuccess&response_type=code&scope=user.id";
		const height = "570";
		const width  = "340";
		const top = window.top.outerHeight / 2 + window.top.screenY - ( height / 2 );
		const left = window.top.outerWidth / 2 + window.top.screenX - ( width / 2 );

		const features = [
			"top=" + top,
			"left=" + left,
			"width=" + width,
			"height=" + height,
			"resizable=1",
			"scrollbars=1",
			"status=0",
		];

		window.open( url, "SEMrush_login", features.join( "," ) );
		e.preventDefault();
	}

	/**
	 * Renders the RelatedKeyPhrasesModal modal component.
	 *
	 * @returns {React.Element} The RelatedKeyPhrasesModal modal component.
	 */
	render() {
		const { keyphrase, location, whichModalOpen, isLoggedIn } = this.props;

		return (
			<Fragment>
				{ isLoggedIn &&
				<div className={ "yoast" }>
					<Button
						variant={ "secondary" }
						small={ true }
						id={ `yoast-get-related-keyphrases-${location}` }
						onClick={ this.onModalOpen }
					>
						{ __( "Get related keyphrases", "wordpress-seo" ) }
					</Button>
				</div> }
				{ keyphrase && whichModalOpen === location &&
				<Modal
					title={ __( "Related keyphrases", "wordpress-seo" ) }
					onRequestClose={ this.onModalClose }
					icon={ <YoastIcon /> }
					additionalClassName="yoast-related-keyphrases-modal"
				>
					<ModalContainer
						className="yoast-gutenberg-modal__content yoast-related-keyphrases-modal__content"
					>
						<Slot name="YoastRelatedKeyphrases" />

					</ModalContainer>
				</Modal>
				}
				{ ! isLoggedIn && <div className={ "yoast" }>
					<ButtonStyledLink
						variant={ "secondary" }
						small={ true }
						id={ `yoast-get-related-keyphrases-${location}` }
						href={ "https://oauth.semrush.com/auth/login" }
						onClick={ this.onLinkClick }
					>
						{ __( "Get related keyphrases", "wordpress-seo" ) }
					</ButtonStyledLink>
				</div> }
			</Fragment>
		);
	}
}

SEMrushRelatedKeyphrasesModal.propTypes = {
	keyphrase: PropTypes.string,
	location: PropTypes.string,
	whichModalOpen: PropTypes.oneOf( [
		"none",
		"metabox",
		"sidebar",
	] ),
	isLoggedIn: PropTypes.bool,
	onOpen: PropTypes.func.isRequired,
	onOpenWithNoKeyphrase: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
};

SEMrushRelatedKeyphrasesModal.defaultProps = {
	keyphrase: "",
	location: "",
	whichModalOpen: "none",
	isLoggedIn: false,
};

export default SEMrushRelatedKeyphrasesModal;
