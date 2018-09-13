package com.tiendas.neto.vo;

import java.io.Serializable;

public class SmsVo implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private MensajeVo[] messages;

	/**
	 * @return the messages
	 */
	public MensajeVo[] getMessages() {
		return messages;
	}

	/**
	 * @param messages the messages to set
	 */
	public void setMessages(MensajeVo[] messages) {
		this.messages = messages;
	}
}
