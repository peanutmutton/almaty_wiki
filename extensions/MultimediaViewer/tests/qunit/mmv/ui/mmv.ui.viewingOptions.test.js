const { OptionsDialog } = require( 'mmv' );

( function () {
	function makeDialog( initialise ) {
		var $qf = $( '#qunit-fixture' ),
			$button = $( '<div>' ).appendTo( $qf ),
			dialog = new OptionsDialog( $qf, $button, { setMediaViewerEnabledOnClick: function () {} } );

		if ( initialise ) {
			dialog.initPanel();
		}

		return dialog;
	}

	QUnit.module( 'mmv.ui.viewingOptions', QUnit.newMwEnvironment() );

	QUnit.test( 'Constructor sense test', function ( assert ) {
		var dialog = makeDialog();
		assert.true( dialog instanceof OptionsDialog, 'Dialog is created successfully' );
	} );

	QUnit.test( 'Initialisation functions', function ( assert ) {
		var dialog = makeDialog( true );

		assert.strictEqual( dialog.$disableDiv.length, 1, 'Disable div is created.' );
		assert.strictEqual( dialog.$enableDiv.length, 1, 'Enable div is created.' );
		assert.strictEqual( dialog.$disableConfirmation.length, 1, 'Disable confirmation is created.' );
		assert.strictEqual( dialog.$enableConfirmation.length, 1, 'Enable confirmation is created.' );
	} );

	QUnit.test( 'Disable', function ( assert ) {
		var $header, $icon, $text, $textHeader, $textBody,
			$submitButton, $cancelButton, $aboutLink,
			dialog = makeDialog(),
			deferred = $.Deferred();

		this.sandbox.stub( dialog.config, 'setMediaViewerEnabledOnClick', function () {
			return deferred;
		} );

		dialog.initDisableDiv();

		$header = dialog.$disableDiv.find( 'h3.mw-mmv-options-dialog-header' );
		$icon = dialog.$disableDiv.find( 'div.mw-mmv-options-icon' );

		$text = dialog.$disableDiv.find( 'div.mw-mmv-options-text' );
		$textHeader = $text.find( 'p.mw-mmv-options-text-header' );
		$textBody = $text.find( 'p.mw-mmv-options-text-body' );
		$aboutLink = $text.find( 'a.mw-mmv-project-info-link' );
		$submitButton = dialog.$disableDiv.find( 'button.mw-mmv-options-submit-button' );
		$cancelButton = dialog.$disableDiv.find( 'button.mw-mmv-options-cancel-button' );

		assert.strictEqual( $header.length, 1, 'Disable header created successfully.' );
		assert.strictEqual( $header.text(), '(multimediaviewer-options-dialog-header)', 'Disable header has correct text (if this fails, it may be due to i18n differences)' );

		assert.strictEqual( $icon.length, 1, 'Icon created successfully.' );
		assert.strictEqual( $icon.html(), '&nbsp;', 'Icon has a blank space in it.' );

		assert.strictEqual( $text.length, 1, 'Text div created successfully.' );
		assert.strictEqual( $textHeader.length, 1, 'Text header created successfully.' );
		assert.strictEqual( $textHeader.text(), '(multimediaviewer-options-text-header)', 'Text header has correct text (if this fails, it may be due to i18n differences)' );

		assert.strictEqual( $textBody.length, 1, 'Text body created successfully.' );
		assert.strictEqual( $textBody.text(), '(multimediaviewer-options-text-body)', 'Text body has correct text (if this fails, it may be due to i18n differences)' );

		assert.strictEqual( $aboutLink.length, 1, 'About link created successfully.' );
		assert.strictEqual( $aboutLink.text(), '(multimediaviewer-options-learn-more)', 'About link has correct text (if this fails, it may be due to i18n differences)' );

		assert.strictEqual( $submitButton.length, 1, 'Disable button created successfully.' );
		assert.strictEqual( $submitButton.text(), '(multimediaviewer-option-submit-button)', 'Disable button has correct text (if this fails, it may be due to i18n differences)' );

		assert.strictEqual( $cancelButton.length, 1, 'Cancel button created successfully.' );
		assert.strictEqual( $cancelButton.text(), '(multimediaviewer-option-cancel-button)', 'Cancel button has correct text (if this fails, it may be due to i18n differences)' );

		$submitButton.trigger( 'click' );

		assert.strictEqual( dialog.$disableConfirmation.hasClass( 'mw-mmv-shown' ), false, 'Disable confirmation not shown yet' );
		assert.strictEqual( dialog.$dialog.hasClass( 'mw-mmv-disable-confirmation-shown' ), false, 'Disable confirmation not shown yet' );

		// Pretend that the async call in mmv.js succeeded
		deferred.resolve();

		// The confirmation should appear
		assert.strictEqual( dialog.$disableConfirmation.hasClass( 'mw-mmv-shown' ), true, 'Disable confirmation shown' );
		assert.strictEqual( dialog.$dialog.hasClass( 'mw-mmv-disable-confirmation-shown' ), true, 'Disable confirmation shown' );
	} );

	QUnit.test( 'Enable', function ( assert ) {
		var $header, $icon, $text, $textHeader, $aboutLink,
			$submitButton, $cancelButton,
			dialog = makeDialog(),
			deferred = $.Deferred();

		this.sandbox.stub( dialog.config, 'setMediaViewerEnabledOnClick', function () {
			return deferred;
		} );

		dialog.initEnableDiv();

		$header = dialog.$enableDiv.find( 'h3.mw-mmv-options-dialog-header' );
		$icon = dialog.$enableDiv.find( 'div.mw-mmv-options-icon' );

		$text = dialog.$enableDiv.find( 'div.mw-mmv-options-text' );
		$textHeader = $text.find( 'p.mw-mmv-options-text-header' );
		$aboutLink = $text.find( 'a.mw-mmv-project-info-link' );
		$submitButton = dialog.$enableDiv.find( 'button.mw-mmv-options-submit-button' );
		$cancelButton = dialog.$enableDiv.find( 'button.mw-mmv-options-cancel-button' );

		assert.strictEqual( $header.length, 1, 'Enable header created successfully.' );
		assert.strictEqual( $header.text(), '(multimediaviewer-enable-dialog-header)', 'Enable header has correct text (if this fails, it may be due to i18n differences)' );

		assert.strictEqual( $icon.length, 1, 'Icon created successfully.' );
		assert.strictEqual( $icon.html(), '&nbsp;', 'Icon has a blank space in it.' );

		assert.strictEqual( $text.length, 1, 'Text div created successfully.' );
		assert.strictEqual( $textHeader.length, 1, 'Text header created successfully.' );
		assert.strictEqual( $textHeader.text(), '(multimediaviewer-enable-text-header)', 'Text header has correct text (if this fails, it may be due to i18n differences)' );

		assert.strictEqual( $aboutLink.length, 1, 'About link created successfully.' );
		assert.strictEqual( $aboutLink.text(), '(multimediaviewer-options-learn-more)', 'About link has correct text (if this fails, it may be due to i18n differences)' );

		assert.strictEqual( $submitButton.length, 1, 'Enable button created successfully.' );
		assert.strictEqual( $submitButton.text(), '(multimediaviewer-enable-submit-button)', 'Enable button has correct text (if this fails, it may be due to i18n differences)' );

		assert.strictEqual( $cancelButton.length, 1, 'Cancel button created successfully.' );
		assert.strictEqual( $cancelButton.text(), '(multimediaviewer-option-cancel-button)', 'Cancel button has correct text (if this fails, it may be due to i18n differences)' );

		$submitButton.trigger( 'click' );

		assert.strictEqual( dialog.$enableConfirmation.hasClass( 'mw-mmv-shown' ), false, 'Enable confirmation not shown yet' );
		assert.strictEqual( dialog.$dialog.hasClass( 'mw-mmv-enable-confirmation-shown' ), false, 'Enable confirmation not shown yet' );

		// Pretend that the async call in mmv.js succeeded
		deferred.resolve();

		// The confirmation should appear
		assert.strictEqual( dialog.$enableConfirmation.hasClass( 'mw-mmv-shown' ), true, 'Enable confirmation shown' );
		assert.strictEqual( dialog.$dialog.hasClass( 'mw-mmv-enable-confirmation-shown' ), true, 'Enable confirmation shown' );
	} );
}() );
