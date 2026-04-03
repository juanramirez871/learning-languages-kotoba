//
//  widgetBundle.swift
//  widget
//
//  Created by Juan Diego on 3/04/26.
//

import WidgetKit
import SwiftUI

@main
struct widgetBundle: WidgetBundle {
    var body: some Widget {
        JapaneseWordWidget()
        EnglishWordWidget()
    }
}
