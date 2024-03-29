/*
 * This file is part of the MediaWiki extension MediaViewer.
 *
 * MediaViewer is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * MediaViewer is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with MediaViewer.  If not, see <http://www.gnu.org/licenses/>.
 */

const { Canvas, LightboxImage } = require( 'mmv' );

( function () {
	QUnit.module( 'mmv.ui.Canvas', QUnit.newMwEnvironment() );

	QUnit.test( 'Constructor sense check', function ( assert ) {
		var $qf = $( '#qunit-fixture' ),
			canvas = new Canvas( $qf, $qf, $qf );

		assert.strictEqual( canvas.$imageDiv.length, 1, 'Image container is created.' );
		assert.strictEqual( canvas.$imageWrapper, $qf, '$imageWrapper is set correctly.' );
		assert.strictEqual( canvas.$mainWrapper, $qf, '$mainWrapper is set correctly.' );
	} );

	QUnit.test( 'empty() and set()', function ( assert ) {
		var $qf = $( '#qunit-fixture' ),
			canvas = new Canvas( $qf ),
			image = new Image(),
			$imageElem = $( image ),
			imageRawMetadata = new LightboxImage( 'foo.png' );

		canvas.empty();

		assert.strictEqual( canvas.$imageDiv.html(), '', 'Canvas is empty.' );
		assert.strictEqual( canvas.$imageDiv.hasClass( 'empty' ), true, 'Canvas is not visible.' );

		canvas.set( imageRawMetadata, $imageElem );

		assert.strictEqual( canvas.$image, $imageElem, 'Image element set correctly.' );
		assert.strictEqual( canvas.imageRawMetadata, imageRawMetadata, 'Raw metadata set correctly.' );
		assert.strictEqual( canvas.$imageDiv.html(), '<img>', 'Image added to container.' );
		assert.strictEqual( canvas.$imageDiv.hasClass( 'empty' ), false, 'Canvas is visible.' );

		canvas.empty();

		assert.strictEqual( canvas.$imageDiv.html(), '', 'Canvas is empty.' );
		assert.strictEqual( canvas.$imageDiv.hasClass( 'empty' ), true, 'Canvas is not visible.' );
	} );

	QUnit.test( 'setImageAndMaxDimensions()', function ( assert ) {
		var $qf = $( '#qunit-fixture' ),
			$mainWrapper = $( '<div>' ).appendTo( $qf ),
			$innerWrapper = $( '<div>' ).appendTo( $mainWrapper ),
			$imageWrapper = $( '<div>' ).appendTo( $innerWrapper ),
			canvas = new Canvas( $innerWrapper, $imageWrapper, $mainWrapper ),
			imageRawMetadata = new LightboxImage( 'foo.png' ),
			image = new Image(),
			$imageElem = $( image ),
			image2 = new Image(),
			thumbnailWidth = 10,
			screenWidth = 100,
			$currentImage,
			originalWidth;

		// Need to call set() before using setImageAndMaxDimensions()
		canvas.set( imageRawMetadata, $imageElem );
		originalWidth = image.width;

		// Call with the same image
		canvas.setImageAndMaxDimensions(
			{ width: thumbnailWidth },
			image,
			{ cssWidth: screenWidth }
		);

		assert.strictEqual( image.width, originalWidth, 'Image width was not modified.' );
		assert.strictEqual( canvas.$image, $imageElem, 'Image element still set correctly.' );

		$currentImage = canvas.$image;

		// Call with a new image bigger than screen size
		thumbnailWidth = 150;
		canvas.setImageAndMaxDimensions(
			{ width: thumbnailWidth },
			image2,
			{ cssWidth: screenWidth }
		);

		assert.strictEqual( image2.width, screenWidth, 'Image width was trimmed correctly.' );
		assert.notStrictEqual( canvas.$image, $currentImage, 'Image element switched correctly.' );
	} );

	QUnit.test( 'maybeDisplayPlaceholder: Constrained area for SVG files', function ( assert ) {
		var $image,
			blurredThumbnailShown,
			$qf = $( '#qunit-fixture' ),
			imageRawMetadata = new LightboxImage( 'foo.svg' ),
			canvas = new Canvas( $qf );

		imageRawMetadata.filePageTitle = {
			getExtension: function () { return 'svg'; }
		};
		canvas.imageRawMetadata = imageRawMetadata;

		canvas.set = function () {
			assert.true( false, 'Placeholder is not shown' );
		};

		$image = $( '<img>' ).width( 10 ).height( 5 );

		blurredThumbnailShown = canvas.maybeDisplayPlaceholder(
			{ width: 200, height: 100 },
			$image,
			{ cssWidth: 300, cssHeight: 150 }
		);

		assert.strictEqual( $image.width(), 10, 'Placeholder width was not set to max' );
		assert.strictEqual( $image.height(), 5, 'Placeholder height was not set to max' );
		assert.strictEqual( $image.hasClass( 'blurred' ), false, 'Placeholder is not blurred' );
		assert.strictEqual( blurredThumbnailShown, false, 'Placeholder state is correct' );
	} );

	QUnit.test( 'maybeDisplayPlaceholder: placeholder big enough that it doesn\'t need blurring, actual image bigger than the lightbox', function ( assert ) {
		var $image,
			blurredThumbnailShown,
			$qf = $( '#qunit-fixture' ),
			imageRawMetadata = new LightboxImage( 'foo.png' ),
			canvas = new Canvas( $qf );

		imageRawMetadata.filePageTitle = {
			getExtension: function () { return 'png'; }
		};
		canvas.imageRawMetadata = imageRawMetadata;

		canvas.set = function () {
			assert.true( true, 'Placeholder shown' );
		};

		$image = $( '<img>' ).width( 200 ).height( 100 );

		blurredThumbnailShown = canvas.maybeDisplayPlaceholder(
			{ width: 1000, height: 500 },
			$image,
			{ cssWidth: 300, cssHeight: 150 }
		);

		assert.strictEqual( $image.width(), 300, 'Placeholder has the right width' );
		assert.strictEqual( $image.height(), 150, 'Placeholder has the right height' );
		assert.strictEqual( $image.hasClass( 'blurred' ), false, 'Placeholder is not blurred' );
		assert.strictEqual( blurredThumbnailShown, false, 'Placeholder state is correct' );
	} );

	QUnit.test( 'maybeDisplayPlaceholder: big-enough placeholder that needs blurring, actual image bigger than the lightbox', function ( assert ) {
		var $image,
			blurredThumbnailShown,
			$qf = $( '#qunit-fixture' ),
			imageRawMetadata = new LightboxImage( 'foo.png' ),
			canvas = new Canvas( $qf );

		imageRawMetadata.filePageTitle = {
			getExtension: function () { return 'png'; }
		};
		canvas.imageRawMetadata = imageRawMetadata;

		canvas.set = function () {
			assert.true( true, 'Placeholder shown' );
		};

		$image = $( '<img>' ).width( 100 ).height( 50 );

		blurredThumbnailShown = canvas.maybeDisplayPlaceholder(
			{ width: 1000, height: 500 },
			$image,
			{ cssWidth: 300, cssHeight: 150 }
		);

		assert.strictEqual( $image.width(), 300, 'Placeholder has the right width' );
		assert.strictEqual( $image.height(), 150, 'Placeholder has the right height' );
		assert.strictEqual( $image.hasClass( 'blurred' ), true, 'Placeholder is blurred' );
		assert.strictEqual( blurredThumbnailShown, true, 'Placeholder state is correct' );
	} );

	QUnit.test( 'maybeDisplayPlaceholder: big-enough placeholder that needs blurring, actual image smaller than the lightbox', function ( assert ) {
		var $image,
			blurredThumbnailShown,
			$qf = $( '#qunit-fixture' ),
			imageRawMetadata = new LightboxImage( 'foo.png' ),
			canvas = new Canvas( $qf );

		imageRawMetadata.filePageTitle = {
			getExtension: function () { return 'png'; }
		};
		canvas.imageRawMetadata = imageRawMetadata;

		canvas.set = function () {
			assert.true( true, 'Placeholder shown' );
		};

		$image = $( '<img>' ).width( 100 ).height( 50 );

		blurredThumbnailShown = canvas.maybeDisplayPlaceholder(
			{ width: 1000, height: 500 },
			$image,
			{ cssWidth: 1200, cssHeight: 600 }
		);

		assert.strictEqual( $image.width(), 1000, 'Placeholder has the right width' );
		assert.strictEqual( $image.height(), 500, 'Placeholder has the right height' );
		assert.strictEqual( $image.hasClass( 'blurred' ), true, 'Placeholder is blurred' );
		assert.strictEqual( blurredThumbnailShown, true, 'Placeholder state is correct' );
	} );

	QUnit.test( 'maybeDisplayPlaceholder: placeholder too small to be displayed, actual image bigger than the lightbox', function ( assert ) {
		var $image,
			blurredThumbnailShown,
			$qf = $( '#qunit-fixture' ),
			imageRawMetadata = new LightboxImage( 'foo.png' ),
			canvas = new Canvas( $qf );

		imageRawMetadata.filePageTitle = {
			getExtension: function () { return 'png'; }
		};
		canvas.imageRawMetadata = imageRawMetadata;

		canvas.set = function () {
			assert.true( false, 'Placeholder shown when it should not' );
		};

		$image = $( '<img>' ).width( 10 ).height( 5 );

		blurredThumbnailShown = canvas.maybeDisplayPlaceholder(
			{ width: 1000, height: 500 },
			$image,
			{ cssWidth: 300, cssHeight: 150 }
		);

		assert.strictEqual( $image.width(), 10, 'Placeholder has the right width' );
		assert.strictEqual( $image.height(), 5, 'Placeholder has the right height' );
		assert.strictEqual( $image.hasClass( 'blurred' ), false, 'Placeholder is not blurred' );
		assert.strictEqual( blurredThumbnailShown, false, 'Placeholder state is correct' );
	} );

	QUnit.test( 'unblurWithAnimation', function ( assert ) {
		var $qf = $( '#qunit-fixture' ),
			canvas = new Canvas( $qf ),
			oldAnimate = $.fn.animate;

		$.fn.animate = function ( target, options ) {
			var key;

			if ( options ) {
				if ( options.step ) {
					for ( key in target ) {
						options.step.call( this, target[ key ] /* , tween object */ );
					}
				}

				if ( options.complete ) {
					options.complete.call( this );
				}
			}
		};

		canvas.$image = $( '<img>' );

		canvas.unblurWithAnimation();

		assert.true( !canvas.$image.css( '-webkit-filter' ) || !canvas.$image.css( '-webkit-filter' ).length,
			'Image has no -webkit-filter left' );
		assert.true( !canvas.$image.css( 'filter' ) || !canvas.$image.css( 'filter' ).length || canvas.$image.css( 'filter' ) === 'none',
			'Image has no filter left' );
		assert.strictEqual( parseInt( canvas.$image.css( 'opacity' ), 10 ), 1,
			'Image is fully opaque' );
		assert.strictEqual( canvas.$image.hasClass( 'blurred' ), false, 'Image has no "blurred" class' );

		$.fn.animate = oldAnimate;
	} );

}() );
